import LeftSidebar from "@/components/LeftSidebar"
import PropertyCard from "@/components/PropertyCard"

const page = () => {
  const renderPropertyCards = () => {
    const propertyCards = [];

    for (let i = 0; i < 10; i++) {
      propertyCards.push(<PropertyCard key={i} />);
    }
    return propertyCards;
  };
  return (
    <section className="flex gap-6 mt-1 ml-1">
       <LeftSidebar/>
       <div className="m-3 text-xl text-gray-900 font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderPropertyCards()}
    </div>
      </section>
 
  )
}

export default page
