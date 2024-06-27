const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().valid(
            "Mountains", 
            "Beaches and Coastal Areas", 
            "Forests and Jungles", 
            "Deserts", 
            "Historical and Cultural Sites", 
            "Urban Destinations", 
            "Countryside and Rural Areas", 
            "Islands", 
            "Lakes and Rivers", 
            "Special Interest and Seasonal Attractions"
        ).required(),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        comment : Joi.string().required(),
    }).required()
});
