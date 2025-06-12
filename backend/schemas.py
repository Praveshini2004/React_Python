from pydantic import BaseModel

class PublisherBase(BaseModel):
    name: str

class PublisherCreate(PublisherBase):
    pass

class Publisher(PublisherBase):
    id: int
    class Config:
        orm_mode = True

class BookBase(BaseModel):
    title: str
    author: str
    price: float
    stock: int
    publisher_id: int

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    price: float
    stock: int

class Book(BookBase):
    id: int
    publisher: Publisher
    class Config:
        orm_mode = True
