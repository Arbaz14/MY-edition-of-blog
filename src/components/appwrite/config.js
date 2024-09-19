import { Client, Account, ID, Databases, Storage, Role,Query,Permission } from "appwrite";
import { ApiError } from "../utils/Error";
import conf from "../../../env/conf.js";

class AppwriteService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.VITE_API_ENDPOINT) // Your API Endpoint
      .setProject(conf.VITE_PROJECT_ID);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async signup({ name, email, password }) {
    try {
      const userDetail = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userDetail;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during sign up ${error}`
      );
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during login ${error}`
      );
    }
  }

    async getUser() {
      
      try {
        const user = await this.account.get(); // Fetch the user
        console.log("User data: ", user);
        return user;
      } catch (error) {
        console.error("Error fetching user: ", error); // Handle error
        throw error; // Propagate error to be handled in the component
      }
    }

  async logout() {
    try {
      const deleteSessions = await this.account.deleteSessions();
      return deleteSessions;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during deleting session ${error}`
      );
    }
  }

  async createDocument(data) {
    try {
      const document = await this.databases.createDocument(
        conf.VITE_DTABASE_ID,
        conf.VITE_COLLECTION_ID,
        ID.unique(),
        data
      );
      return document;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during create document ${error}`
      );
    }
  }

  async getDocument(id) {
    try {
      const document = await this.databases.getDocument(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        id // documentId
      );
      return document;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during getting document ${error}`
      );
    }
  }

  async updateDocument(documentid, updatedata) {
    try {
      const updateUser = await this.databases.updateDocument(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        documentid, // documentId
        updatedata, // data (optional)
      );
      return updateUser;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during updating document ${error}`
      );
    }
  }

  async deleteDocument(id) {
    try {
      const result = await this.databases.deleteDocument(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        id // documentId
      );
      return result;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during deleting document ${error}`
      );
    }
  }

  async listDocuments() {
    try {
      const result = await this.databases.listDocuments(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        [Query.equal("STATUS", ["true"])] // queries (optional)
      );
      return result;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during getting document list ${error}`
      );
    }
  }
  async searchDocuments(search) {
    try {
      const result = await this.databases.listDocuments(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        [Query.equal("STATUS", ["true"]), // queries (optional)
        Query.contains("TITLE", [search])
        
      ] // queries (optional)
      );
      return result;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during getting document list ${error}`
      );
    }
  }
  async getuserDocuments(ID) {
    try {
      const result = await this.databases.listDocuments(
        conf.VITE_DTABASE_ID, // databaseId
        conf.VITE_COLLECTION_ID, // collectionId
        [Query.equal("USER_ID", [ID])] // queries (optional)
      );
      return result;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during getting document list ${error}`
      );
    }
  }

  async uploadImage(imagefile) {
    try {
      const imageUpload = await this.storage.createFile(
        conf.VITE_BUCKET_ID,
        ID.unique(),
        imagefile,
      );
      return imageUpload;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during uploading image ${error}`
      );
    }
  }

  async getImage(imageid) {
    try {
      const imageUpload = await this.storage.getFileView(
        conf.VITE_BUCKET_ID,
        imageid
      );
      return imageUpload;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during uploading image ${error}`
      );
    }
  }
  async deleteImage(imageid) {
    try {
      const imagedelet = await this.storage.deleteFile(
        conf.VITE_BUCKET_ID,
        imageid
      );
      return imagedelet;
    } catch (error) {
      throw new ApiError(
        "401",
        "",
        `Something went wrong during uploading image ${error}`
      );
    }
  }
}


const appwriteService = new AppwriteService();
export default appwriteService;
