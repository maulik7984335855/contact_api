import { Contact } from "../Models/Contact.js";

export const getAllContact =  async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) {
      return res.status(404).json({ message: "Contact Not Found", contacts });
    }
    res.json({ message: "Contact Fetched Successfully", contacts });
  }

  export const getSpecificContact = async (req, res) => {
    const id = req.params.id;
  
    const userContact = await Contact.findById(id);
    if (!userContact) {
      return res.status(404).json({ message: "Contact Not Found", userContact });
    }
    res.json({ message: "Contact Found Successfully", userContact });
  }

  export const addNewContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
  
    if(name == " " || email == " " || phone == " "|| type == " "){
      return res.status(400).json({message:"All fields are required"})
    }
  
    const saveContact = await Contact.create({
      name,
      email,
      phone,
      type,
      user:req.user
    });
  
    res.json({ message: "Contact Saved Successfully", saveContact });
  }

  export const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        type,
        user:req.user
      },
      { new: true }
    );
  
    if (!updateContact) {
      return res.status(404).json({ message: "No Contact Found" });
    }
    res.json({ message: "Contact Updated Successfully", updateContact });
  }

  export const deleteContact = async (req, res) => {
    const id = req.params.id;
    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!deleteContact) {
      return res.status(404).json({ message: "Contact Not Found", deleteContact });
    }
    res.json({ message: "Contact Delete SuccessFully", deleteContact });
  }

  // get contact by user id
  export const getContactByUserId = async (req,res) =>{
    const id = req.params.id;
    let contact = await Contact.find({user:id})

    if(!contact){
      return res.status(404).json({message:"Not Found"})
    }
    res.json({message:"User Specific Contact",contact})

  }