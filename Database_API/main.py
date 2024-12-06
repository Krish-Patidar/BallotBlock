from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Voter(BaseModel):
    voter_id: str
    role: str

@app.post("/register/")
async def register_voter(voter: Voter):

    return {"message": "Voter registered successfully!"}