import { Request, Response } from 'express';
import { MongoClient as mockMongoClient, ObjectId } from 'mongodb';
import app from '../notesHandlers';

// Mock MongoDB
jest.mock('mongodb', () => ({
  MongoClient: jest.fn(() => ({
    connect: jest.fn(),
    close: jest.fn(),
    db: jest.fn(() => ({
      collection: jest.fn()
    }))
  }))
}));

// Test for getting all notes
describe('getNotes API', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let client: any;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || '';
    client = new mockMongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all notes', async () => {
    const mockFind = jest.fn(() => ({
      toArray: jest.fn().mockResolvedValue([{ _id: 'fakeId', title: 'Test Note', content: 'This is a test note content.' }])
    }));

    (client.db().collection as jest.Mock).mockReturnValueOnce({
      find: mockFind
    });

    await app.getNotes(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith([{ _id: 'fakeId', title: 'Test Note', content: 'This is a test note content.' }]);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// Test for getting note by Id
describe('getNoteById API', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let client: any;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || '';
    client = new mockMongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(() => {
    req = { params: { id: 'fakeId' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a note by ID', async () => {
    const mockFindOne = jest.fn(() => ({ _id: 'fakeId', title: 'Test Note', content: 'This is a test note content.' }));

    (client.db().collection as jest.Mock).mockReturnValueOnce({
      findOne: mockFindOne
    });

    await app.getNoteById(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ _id: 'fakeId', title: 'Test Note', content: 'This is a test note content.' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// Test for updating note by Id
describe('updateNoteById API', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let client: any;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || '';
    client = new mockMongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(() => {
    req = { params: { id: 'fakeId' }, body: { title: 'Updated Title', content: 'Updated Content' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a note by ID', async () => {
    const mockUpdateOne = jest.fn(() => ({ matchedCount: 1 })); // Hard-coded return value

    (client.db().collection as jest.Mock).mockReturnValueOnce({
      updateOne: mockUpdateOne
    });

    await app.updateNoteById(req as Request, res as Response);

    expect(mockUpdateOne).toHaveBeenCalledWith(
      { _id: new ObjectId('fakeId') },
      { $set: { title: 'Updated Title', content: 'Updated Content' } }
    );
    expect(res.json).toHaveBeenCalledWith({ message: 'Note updated successfully.' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// Test for deleting note by Id
describe('deleteNoteById API', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let client: any;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || '';
    client = new mockMongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(() => {
    req = { params: { id: 'fakeId' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a note by ID', async () => {
    const mockDeleteOne = jest.fn(() => ({ deletedCount: 1 })); // Hard-coded return value

    (client.db().collection as jest.Mock).mockReturnValueOnce({
      deleteOne: mockDeleteOne
    });

    await app.deleteNoteById(req as Request, res as Response);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: new ObjectId('fakeId') });
    expect(res.json).toHaveBeenCalledWith({ message: 'Note deleted successfully.' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
