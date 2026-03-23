// src/services/llm.ts
import { ModelManager, ModelCategory } from '@runanywhere/web'
import { TextGeneration } from '@runanywhere/web-llamacpp'  // ← THIS was the red line

let modelLoaded = false

export async function initLLM(): Promise<void> {
  if (modelLoaded) return

  const models = ModelManager.getModels().filter(
    (m) => m.modality === ModelCategory.Language
  )
  const model = models[0]
  if (!model) throw new Error('No language model registered')

  if (model.status !== 'downloaded' && model.status !== 'loaded') {
    console.log('Downloading model...')
    await ModelManager.downloadModel(model.id)
  }

  await ModelManager.loadModel(model.id)
  modelLoaded = true
  console.log('LLM ready ✓')
}

export async function generateResponse(userText: string): Promise<string> {
  await initLLM()
  const { stream, result: resultPromise } = await TextGeneration.generateStream(
    userText,
    { maxTokens: 200, temperature: 0.7 }
  )
  let text = ''
  for await (const token of stream) {
    text += token
  }
  await resultPromise
  return text
}

export async function generateResponseStream(
  userText: string,
  onToken: (token: string) => void
): Promise<string> {
  await initLLM()
  const { stream, result: resultPromise } = await TextGeneration.generateStream(
    userText,
    { maxTokens: 200, temperature: 0.7 }
  )
  let text = ''
  for await (const token of stream) {
    text += token
    onToken(token)
  }
  await resultPromise
  return text
}