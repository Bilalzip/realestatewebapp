// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    // Structure to represent a property
    struct Property {
        string name;
        string[] images;
        string address;
        string[] nearbyAmenities;
    }

    // Array to store all listed properties
    Property[] public properties;

    // Event emitted when a new property is listed
    event PropertyListed(uint indexed propertyId);

    // Function to list a new property
    function listProperty(
        string memory _name,
        string[] memory _images,
        string memory _address,
        string[] memory _nearbyAmenities
    ) public {
        Property memory newProperty = Property({
            name: _name,
            images: _images,
            address: _address,
            nearbyAmenities: _nearbyAmenities
        });

        properties.push(newProperty);

        // Emit an event indicating the new property listing
        emit PropertyListed(properties.length - 1);
    }

    // Function to get the details of a specific property
    function getProperty(
        uint _propertyId
    )
        public
        view
        returns (
            string memory name,
            string[] memory images,
            string memory propertyAddress,
            string[] memory nearbyAmenities
        )
    {
        require(_propertyId < properties.length, "Property does not exist");

        Property memory property = properties[_propertyId];

        return (
            property.name,
            property.images,
            property.address,
            property.nearbyAmenities
        );
    }

    // Function to get the total number of listed properties
    function getPropertyCount() public view returns (uint) {
        return properties.length;
    }
}
