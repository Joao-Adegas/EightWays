from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
api_key = os.getenv("api_key")
os.environ["GROQ_API_KEY"] = api_key
mensagens = []

chat = ChatGroq(model="llama-3.3-70b-versatile")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class InputData(BaseModel):
    pergunta: str


def resposta_bot(msg):
    mensagens_modelo = [("system","Você é um especialista nos 8 remédios naturais e response perguntas relacionadas a eles.")]
    mensagens_modelo += msg
    template = ChatPromptTemplate.from_messages(mensagens_modelo)
    chain = template | chat 
    return chain.invoke({}).content


@app.post("/pergunta")
def gerar_resposta(dados:InputData):
    global mensagens
    
    # Adiciona a pergunta do usuário ao histórico
    mensagens.append({"role": "user", "content": dados.pergunta})

    # Gera resposta do bot
    resposta = resposta_bot(mensagens)

    # Adiciona resposta ao histórico
    mensagens.append({"role": "assistant", "content": resposta})

    return {"resposta": resposta}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)

