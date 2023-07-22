import openai from './config'


async function generatePostAI(message, prompt) {

  prompt += `You: ${message.content}\n`;
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 60,
    temperature: 0.3,
    top_p: 0.3,
    presence_penalty: 0,
    frequency_penalty: 0.5,
  });
  prompt += `${response.data.choices[0].text}\n`;
  return `${response.data.choices[0].text.substring(5)}`;
}


export default generatePostAI;