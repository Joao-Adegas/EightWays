from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class ObjetivoPersonalizado(BaseModel):
    titulo: str
    categoria: str
    descricao: str

class ObjetivoUsuario(BaseModel):
    user_id: int
    objetivo_id: int | None = None
    objetivo_personalizado_id: int | None = None

# Dados iniciais
objetivos = [
    {"id": 1, "titulo": "Evitar alimentos ultraprocessados", "categoria": "Nutrição", "descricao": "Priorizar refeições naturais e alimentos frescos."},
    {"id": 2, "titulo": "Incluir mais vegetais na dieta", "categoria": "Nutrição", "descricao": "Adicionar verduras e legumes frescos às refeições."},
    
    {"id": 3, "titulo": "Praticar exercícios regularmente", "categoria": "Exercicio", "descricao": "Fazer caminhadas e atividades físicas diariamente."},
    {"id": 4, "titulo": "Alongar-se antes de atividades físicas", "categoria": "Exercicio", "descricao": "Evita lesões e melhora a mobilidade."},
    
    {"id": 5, "titulo": "Cultivar pensamentos positivos", "categoria": "Confiança", "descricao": "Substituir pensamentos negativos por afirmações positivas."},
    {"id": 6, "titulo": "Buscar apoio emocional", "categoria": "Confiança", "descricao": "Conversar com amigos e familiares sobre emoções."},
    
    {"id": 7, "titulo": "Beber água regularmente", "categoria": "Água", "descricao": "Consumir pelo menos 2 litros de água por dia."},
    {"id": 8, "titulo": "Evitar bebidas açucaradas", "categoria": "Água", "descricao": "Substituir refrigerantes por água ou sucos naturais."},
    
    {"id": 9, "titulo": "Garantir um sono de qualidade", "categoria": "Descanso", "descricao": "Dormir pelo menos 7-8 horas por noite."},
    {"id": 10, "titulo": "Evitar telas antes de dormir", "categoria": "Descanso", "descricao": "Desligar dispositivos eletrônicos 1 hora antes do sono."},
    
    {"id": 11, "titulo": "Expor-se ao sol diariamente", "categoria": "Sol", "descricao": "Tomar sol por pelo menos 15 minutos ao dia."},
    {"id": 12, "titulo": "Usar protetor solar corretamente", "categoria": "Sol", "descricao": "Proteger a pele contra radiação excessiva."},
    
    {"id": 13, "titulo": "Respirar ar puro", "categoria": "Ar Puro", "descricao": "Passar tempo em ambientes naturais."},
    {"id": 14, "titulo": "Evitar ambientes poluídos", "categoria": "Ar Puro", "descricao": "Ficar longe de fumaça de cigarro e poluição."},
    
    {"id": 15, "titulo": "Ter equilíbrio na alimentação", "categoria": "Temperança", "descricao": "Evitar excessos e consumir alimentos naturais."},
    {"id": 16, "titulo": "Evitar substâncias prejudiciais", "categoria": "Temperança", "descricao": "Manter distância do álcool, tabaco e drogas."}
]


usuarios = [
    {"id": 1, "nome": "Gabs", "idade": 19, "altura": 1.55, "peso": 52}
]

objetivos_personalizados = []
objetivos_usuario = []

# Rotas
@app.get("/")
async def root():
    return {"message": "API de Objetivos"}

@app.get("/objetivos/{categoria}")
async def listar_objetivos_por_categoria(categoria: str):
    objetivos_filtrados = [obj for obj in objetivos if obj["categoria"].lower() == categoria.lower()]
    if not objetivos_filtrados:
        raise HTTPException(status_code=404, detail=f"Nenhum objetivo encontrado na categoria '{categoria}'")
    return jsonable_encoder(objetivos_filtrados)

@app.get("/objetivos_usuario/")
async def listar_objetivos_usuario():
    lista_completa = []

    for relacao in objetivos_usuario:
        objetivo_info = None

        if relacao.get("objetivo_personalizado_id"):
            objetivo_info = next(
                (obj for obj in objetivos_personalizados 
                 if obj["id"] == relacao["objetivo_personalizado_id"]), 
                None
            )
            tipo = "personalizado"
        elif relacao.get("objetivo_id"):
            objetivo_info = next(
                (obj for obj in objetivos 
                 if obj["id"] == relacao["objetivo_id"]), 
                None
            )
            tipo = "sugerido"

        if objetivo_info:
            lista_completa.append({
                "id": relacao["id"],
                "user_id": relacao["user_id"],
                "objetivo": objetivo_info,
                "tipo": tipo
            })

    return jsonable_encoder(lista_completa)  # 🔥 Sempre retorna apenas objetivos adicionados!



@app.post("/usuarios/{user_id}/objetivos_personalizados/")
async def criar_objetivo_personalizado(user_id: int, objetivo: ObjetivoPersonalizado):
    if not any(user["id"] == user_id for user in usuarios):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    # Gera ID para o novo objetivo
    novo_id = max([obj["id"] for obj in objetivos_personalizados], default=1000) + 1  # 🔥 Começa em 1000 para não conflitar com objetivos sugeridos
    
    # Cria o objetivo personalizado
    novo_objetivo = {
        "id": novo_id,
        **objetivo.dict()
    }
    objetivos_personalizados.append(novo_objetivo)
    
    # Cria a relação usuário-objetivo
    relacao_id = max([rel["id"] for rel in objetivos_usuario], default=0) + 1
    nova_relacao = {
        "id": relacao_id,
        "user_id": user_id,
        "objetivo_personalizado_id": novo_id,
        "objetivo_id": None
    }
    objetivos_usuario.append(nova_relacao)
    
    return {
        "message": "Objetivo personalizado criado com sucesso",
        "objetivo": novo_objetivo,
        "relacao": nova_relacao
    }

@app.post("/objetivos_usuario/")
async def adicionar_objetivo_usuario(objetivo_usuario: ObjetivoUsuario):
    # Verifica se o objetivo existe
    objetivo = None
    if objetivo_usuario.objetivo_id:
        objetivo = next((obj for obj in objetivos if obj["id"] == objetivo_usuario.objetivo_id), None)
        if not objetivo:
            raise HTTPException(status_code=404, detail="Objetivo não encontrado")
    
    # Cria a nova relação
    nova_relacao = {
        "id": len(objetivos_usuario) + 1,
        "user_id": objetivo_usuario.user_id,
        "objetivo_id": objetivo_usuario.objetivo_id,
        "objetivo_personalizado_id": objetivo_usuario.objetivo_personalizado_id
    }
    objetivos_usuario.append(nova_relacao)

    return jsonable_encoder({
        "message": "Objetivo adicionado com sucesso!",
        "objetivo_adicionado": nova_relacao,
        "objetivo": objetivo  # 🔥 Agora retorna o objetivo completo
    })


@app.delete("/objetivos_usuario/{relacao_id}")
async def deletar_objetivo_usuario(relacao_id: int):
    global objetivos_usuario
    objetivos_usuario = [rel for rel in objetivos_usuario if rel["id"] != relacao_id]
    return {"message": "Objetivo removido da lista do usuário"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)