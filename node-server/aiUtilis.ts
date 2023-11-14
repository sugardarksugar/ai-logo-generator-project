import fetch from "cross-fetch";

export async function callAiPredict() {
    let img_to_python = await fetch("http://127.0.0.1:5000/");
    let data = await img_to_python.json()
    return data
}