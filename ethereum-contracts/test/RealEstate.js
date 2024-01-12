import { ethers } from "hardhat";
import { expect } from "chai";

describe("RealEstate Contract", function () {
  let realEstateContract;
  let owner;
  const propertyImages = ["image1.jpg", "image2.jpg"];
  const amenities = ["park", "school"];

  beforeEach(async function () {
    const RealEstate = await ethers.getContractFactory("RealEstate");
    realEstateContract = await RealEstate.deploy();
    await realEstateContract.deployed();

    [owner] = await ethers.getSigners();
  });

  it("Should list a new property", async function () {
    const propertyName = "Luxury Villa";
    const propertyAddress = "123 Main St";

    await realEstateContract.connect(owner).listProperty(
      propertyName,
      propertyImages,
      propertyAddress,
      amenities
    );

    const propertyCount = await realEstateContract.getPropertyCount();
    expect(propertyCount).to.equal(1);

    const [name, images, address, nearbyAmenities] = await realEstateContract.getProperty(0);

    expect(name).to.equal(propertyName);
    expect(images).to.deep.equal(propertyImages);
    expect(address).to.equal(propertyAddress);
    expect(nearbyAmenities).to.deep.equal(amenities);
  });

  it("Should return correct property count", async function () {
    const propertyName1 = "Condo A";
    const propertyName2 = "Apartment B";

    await realEstateContract.connect(owner).listProperty(
      propertyName1,
      propertyImages,
      "456 Oak St",
      amenities
    );

    await realEstateContract.connect(owner).listProperty(
      propertyName2,
      propertyImages,
      "789 Pine St",
      amenities
    );

    const propertyCount = await realEstateContract.getPropertyCount();
    expect(propertyCount).to.equal(2);
  });

  it("Should handle retrieving details for a non-existing property", async function () {
    // Attempting to get details of a non-existing property (property with ID 999)
    await expect(realEstateContract.getProperty(999)).to.be.revertedWith("Property does not exist");
  });
});
