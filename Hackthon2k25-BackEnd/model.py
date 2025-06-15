from typing import Optional, Literal
from pydantic import BaseModel, Field


# Tabela para registrar os objetivos sugeridos pelo nosso app
class Objetivo(BaseModel):
    id: Optional[int] = None  # O `id` é opcional na entrada assim ele é adicionado automaticamente pelo codigo na hora de ser salvo
    titulo: Optional[str] = None
    categoria: Literal["Nutrição", "Exercicio", "Confiança", "Água", "Descanço", "Sol", "Ar Puro", "Temperança"]
    descricao: Optional[str] = None

# Tabela para registrar usuários no sistema
class Usuario(BaseModel):
    id: Optional[int] = None
    nome: Optional[str] = None
    idade: Optional[int] = None
    altura: Optional[float] = None
    peso: Optional[float] = None

# Modelo de Objetivos do Usuário (Armazena as opções de objetivos que o usuario escolheu entre os disponiveis no sistema (sugestões))
class ObjetivoUsuario(BaseModel):
    id: Optional[int] = None
    user_id: int  # ID do usuário
    objetivo_id: Optional[int] = None  # ID do objetivo sugerido (caso ele escolha um do sistema)
    objetivo_personalizado_id: Optional[int] = None  # ID do objetivo criado pelo usuário


#modelo para a cração de objetivo personalizado pelo usuario
class ObjetivoPersonalizado(BaseModel):
    id: Optional[int] = None
    titulo: Optional[str] = None
    categoria: Literal["Nutrição", "Exercicio", "Confiança", "Água", "Descanço", "Sol", "Ar Puro", "Temperança"]
    descricao: Optional[str] = None


# Objetivo (Objetivo) → Contém objetivos sugeridos pelo sistema.

# Objetivo Personalizado (ObjetivoPersonalizado) → Caso o usuário queira criar um objetivo próprio.

# Objetivo do Usuário (ObjetivoUsuario) → Lista de objetivos selecionados pelo usuário, contendo os objetivos 
# sugeridos pelo sistema e objetivos personalizados.

# Isso significa que um usuário pode: 
# ✅ Escolher um objetivo sugerido e adicioná-lo à sua lista. 
# ✅ Criar um objetivo próprio e adicioná-lo à sua lista. 
# ✅ Excluir um objetivo da sua lista. 
# ✅ Modificar um objetivo da sua lista.