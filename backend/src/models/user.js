const { mongoose } = require("../config/db");

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        default: "Home"
    },
    street: String,
    city: String,
    state: String,
    country: {
        type: String,
        default: "India"
    },
    zip: String,

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },

        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const reviewSchema = new mongoose.Schema({

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
        unique: true
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },

    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    }

}, { timestamps: true });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        id: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            sparse: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    mobile: {
        number: {
            type: Number,
            unique: true,
            sparse: true
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },
    defaultAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        default: null
    }
}, { _id: false });

// UserSchema.index({
//     "address.location": "2dsphere"
// });

const clientSchema = new mongoose.Schema({
    ...userSchema.obj,
    addresses: {
        type: [addressSchema],
        default: []
    },
    role: {
        type: String,
        default: "client"
    }
}, { timestamps: true });

const workerSchema = new mongoose.Schema({
    ...userSchema.obj,
    category: {
        type: String,
        enum: ["plumber", "electrician", "carpenter", "painter", "cleaner", "gardener", "other"],
        trim: true
    },
    alternateMobile: {
        number: {
            type: Number,
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    addresses: {
        type: [addressSchema],
        default: []
    },
    role: {
        type: String,
        default: "worker"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    aadhar: {
        number: {
            type: String,
            unique: true,
            sparse: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    // review stores average rating and total number of reviews
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    bio: {
        type: String,
        default: ""
    },

    experience: {
        type: Number,
        default: 0
    },

    skills: {
        type: [String],
        default: []
    },

    completedJobs: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    refreshTokenHash: String,
    expiresAt: Date
});
// console.log("User: Loading Task model");
// console.log(mongoose.modelNames());
const Client = mongoose.model("Client", clientSchema);
const Worker = mongoose.model("Worker", workerSchema);
const Session = mongoose.model("Session", SessionSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = {
    Client,
    Worker,
    Session,
    Review
}