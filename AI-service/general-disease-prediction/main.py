# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.controller import router as app_router

app = FastAPI()

# CORS settings
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router defined in controller.py
app.include_router(app_router)

# Run the FastAPI application with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8083, reload=True)
