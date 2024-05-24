import express from 'express'
import { addNewContact, deleteContact, getAllContact, getContactByUserId, getSpecificContact, updateContact } from '../Controllers/Contact.js';
import { Authenticate } from '../Middleware/Auth.js';

const router = express.Router();

//get all contact
router.get("/",getAllContact)

//get specific contact
router.get("/:id",getSpecificContact)

//add contact
router.post("/add",Authenticate,addNewContact)

//update contact
router.put("/:id",Authenticate,updateContact)



//delete contact
router.delete("/:id",Authenticate,deleteContact)

//contact by user id
router.get("/userid/:id",getContactByUserId)



export default router;