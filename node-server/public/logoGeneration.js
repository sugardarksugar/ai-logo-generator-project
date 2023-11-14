document.querySelector("#logo-description")
    .addEventListener("submit", async function (event) {
        event.preventDefault()

        const form = event.target;
        const formObject = {};

        let dataPost = document.querySelector("#picture")
        let dataDownload = document.querySelector("#downloadPicture")

        formObject["companyName"] = form.companyName.value
        formObject["companyDescription"] = form.companyDescription.value

        dataDownload.href = ""
        dataPost.src = "res/now-loading-complete.gif"

        console.log({ formObject });

        const res = await fetch(`/logogenerating`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        });

        // let ress = axios.post("/logogenerating", {
        //     timeout: 10000,
        //     data: formObject
        // })

        const result = await res.json();
        
        dataDownload.href = "/generated/" + result.resutlLabel.image
        dataPost.src = "/generated/" + result.resutlLabel.image


        if (result.error) {
            alert(result.error);
        } else {
            console.log("result", result);
        }
    });


