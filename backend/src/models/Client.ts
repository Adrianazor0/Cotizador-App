import mongoose, { Schema, Document} from "mongoose";

export interface IClient extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    taxId?: string;
    active: boolean;
}

const ClientSchema: Schema = new Schema({
    firstName: { 
        type: String, 
        required: true,
        trim: true 
    },  
    lastName: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true      
    },
    address: {
        type: String,
        trim: true
    },
    taxId: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;
