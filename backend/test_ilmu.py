from openai import OpenAI

client = OpenAI(
    base_url="https://api.ilmu.ai/v1",
    api_key="sk-7f3c35ba2b592b7ec3370f6cd5e190add21a6a09f407b587",
)

response = client.chat.completions.create(
    model="ilmu-glm-5.1",
    messages=[
        {"role": "user", "content": "Compare REST vs GraphQL"},
    ],
)

print(response.choices[0].message.content)