from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="BookStore Inventory API")

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/books/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    if not crud.get_publisher_by_id(db, book.publisher_id):
        raise HTTPException(status_code=400, detail="Publisher not found")
    return crud.create_book(db, book)

@app.get("/books/search-books", response_model=list[schemas.Book])
def search_books(title: str = None, author: str = None, db: Session = Depends(get_db)):
    print(f"Search request - title: {title}, author: {author}")  # Debug log
    return crud.search_books(db, title, author)

@app.get("/books/", response_model=list[schemas.Book])
def read_books(db: Session = Depends(get_db)):
    return crud.get_all_books(db)

@app.get("/books/{book_id}", response_model=schemas.Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# @app.put("/books/{book_id}", response_model=schemas.Book)
# def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
#     db_book = crud.update_book(db, book_id, book)
#     if not db_book:
#         raise HTTPException(status_code=404, detail="Book not found")
#     return db_book

@app.put("/books/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    db_book = crud.update_book(db, book_id, book)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    if not crud.delete_book(db, book_id):
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": f"Book with Id {book_id} deleted successfully"}

@app.post("/publishers/", response_model=schemas.Publisher)
def create_publisher(publisher: schemas.PublisherCreate, db: Session = Depends(get_db)):
    return crud.create_publisher(db, publisher)

@app.get("/publishers/", response_model=list[schemas.Publisher])
def read_publishers(db: Session = Depends(get_db)):
    return crud.get_all_publishers(db)

@app.get("/publishers/{publisher_id}", response_model=schemas.Publisher)
def read_publisher(publisher_id: int, db: Session = Depends(get_db)):
    publisher = crud.get_publisher_by_id(db, publisher_id)
    if not publisher:
        raise HTTPException(status_code=404, detail="Publisher not found")
    return publisher

@app.put("/publishers/{publisher_id}", response_model=schemas.Publisher)
def edit_publisher(publisher_id: int, publisher: schemas.PublisherCreate, db: Session = Depends(get_db)):
    return crud.update_publisher(db, publisher_id, publisher)

@app.delete("/publishers/{publisher_id}", response_model=schemas.Publisher)
def remove_publisher(publisher_id: int, db: Session = Depends(get_db)):
    return crud.delete_publisher(db, publisher_id)
