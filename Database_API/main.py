from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Voter(BaseModel):
    voter_id: str
    role: str

@app.post("/register/")
async def register_voter(voter: Voter):
    # Logic to save voter data to the database
    return {"message": "Voter registered successfully!"}