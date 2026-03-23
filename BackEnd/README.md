# instalar a env  

# ativar a env 
cd env\scripts\

.\activate

# instalar as bibliotecas: 
pip install -r requeriments.txt

# instalar o uvicorn 
pip install uvicorn

# rodar o projeto 
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
