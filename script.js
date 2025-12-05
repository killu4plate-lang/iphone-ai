// Lightweight, in-browser text generation using xenova/transformers
// Models load on first run; keep prompts short to avoid memory issues on iPhone.

let pipelineInstance;

async function getPipeline() {
  if (!pipelineInstance) {
    pipelineInstance = await window.transformers.pipeline(
      "text-generation",
      "Xenova/distilgpt2" // small model suitable for browser
    );
  }
  return pipelineInstance;
}

async function generate() {
  const prompt = document.getElementById("prompt").value.trim();
  const out = document.getElementById("out");
  out.textContent = "Loading model / generating...";
  try {
    const pipe = await getPipeline();
    const result = await pipe(prompt, {
      max_new_tokens: 60,
      temperature: 0.9,
      top_p: 0.95
    });
    out.textContent = result[0].generated_text;
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
}

document.getElementById("go").addEventListener("click", generate);
