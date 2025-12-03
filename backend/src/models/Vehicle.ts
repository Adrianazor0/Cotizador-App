import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
    client: mongoose.Types.ObjectId;
    brand: string;
    vehicleModel: string;
    year: number;
    plate: string;
    vin?: string;
    color?: string;
}

const VehicleSchema: Schema = new Schema({
    client: { 
        type: Schema.Types.ObjectId, 
        ref: 'Client',
        required: true 
    },
    brand: { type: String, required: true },  
    vehicleModel: { type: String, required: true },
    year: { type: Number, required: true },
    plate: { type: String, required: true, unique: true},
    vin: { type: String },
    color: { type: String },
}, {
    timestamps: true
});

const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
export default Vehicle;