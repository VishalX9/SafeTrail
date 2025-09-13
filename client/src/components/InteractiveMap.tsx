import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Hotel, 
  Car, 
  Star, 
  Phone, 
  DollarSign,
  Navigation,
  Search,
  Filter
} from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  type: 'hotel' | 'resort';
  lat: number;
  lng: number;
  rating: number;
  price: string;
  condition: 'excellent' | 'good' | 'fair';
  phone: string;
  amenities: string[];
  distance: string;
}

// Sample data for North East India locations
const nearbyLocations: MapLocation[] = [
  {
    id: "1",
    name: "Kaziranga Golf Resort",
    type: "resort",
    lat: 26.5774,
    lng: 93.1717,
    rating: 4.5,
    price: "₹4,500/night",
    condition: "excellent",
    phone: "+91-376-262-429",
    amenities: ["WiFi", "Restaurant", "Pool", "Safari Tours"],
    distance: "2.3 km"
  },
  {
    id: "2", 
    name: "Wild Grass Lodge",
    type: "hotel",
    lat: 26.5850,
    lng: 93.1650,
    rating: 4.2,
    price: "₹3,200/night",
    condition: "good",
    phone: "+91-376-262-085",
    amenities: ["WiFi", "Restaurant", "Garden", "Parking"],
    distance: "1.8 km"
  },
  {
    id: "3",
    name: "Shillong Pine Borough Resort",
    type: "resort", 
    lat: 25.5788,
    lng: 91.8933,
    rating: 4.3,
    price: "₹5,800/night",
    condition: "excellent",
    phone: "+91-364-250-3000",
    amenities: ["WiFi", "Spa", "Restaurant", "Mountain View"],
    distance: "5.2 km"
  },
  {
    id: "4",
    name: "Tawang Inn",
    type: "hotel",
    lat: 27.5856,
    lng: 91.8697,
    rating: 4.0,
    price: "₹2,800/night", 
    condition: "good",
    phone: "+91-379-422-3456",
    amenities: ["WiFi", "Restaurant", "Heating", "Monastery View"],
    distance: "3.7 km"
  }
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'hotel' | 'resort'>('all');
  const [userLocation, setUserLocation] = useState({ lat: 26.5774, lng: 93.1717 }); // Default to Kaziranga

  const filteredLocations = nearbyLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || location.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCallHotel = (phone: string, name: string) => {
    alert(`📞 Calling ${name}\n\nPhone: ${phone}\n\nThis would normally initiate a phone call on mobile devices.`);
  };

  const handleGetDirections = (location: MapLocation) => {
    alert(`🗺️ Getting directions to ${location.name}\n\nFrom your current location to:\n${location.name}\nDistance: ${location.distance}\n\nThis would normally open maps application with directions.`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Interactive Map - Hotels & Resorts
        </CardTitle>
        <CardDescription>
          Find nearby accommodations in good condition across North East India
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search hotels and resorts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'hotel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('hotel')}
            >
              <Hotel className="h-4 w-4 mr-1" />
              Hotels
            </Button>
            <Button
              variant={filterType === 'resort' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('resort')}
            >
              <Car className="h-4 w-4 mr-1" />
              Resorts
            </Button>
          </div>
        </div>

        {/* Map Placeholder - In a real app, this would be Google Maps or similar */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
          <p className="text-muted-foreground mb-4">
            Map showing {filteredLocations.length} locations near your current position
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto">
            {filteredLocations.slice(0, 4).map((location) => (
              <Button
                key={location.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedLocation(location)}
                className="text-xs"
              >
                📍 {location.name.split(' ')[0]}
              </Button>
            ))}
          </div>
        </div>

        {/* Location Details */}
        {selectedLocation && (
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedLocation.type === 'hotel' ? <Hotel className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                    {selectedLocation.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {selectedLocation.distance} away
                  </CardDescription>
                </div>
                <Badge className={getConditionColor(selectedLocation.condition)}>
                  {selectedLocation.condition}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{selectedLocation.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{selectedLocation.price}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleCallHotel(selectedLocation.phone, selectedLocation.name)}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Hotel
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleGetDirections(selectedLocation)}
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Nearby Accommodations ({filteredLocations.length})</h3>
          {filteredLocations.map((location) => (
            <div 
              key={location.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-center gap-3">
                {location.type === 'hotel' ? <Hotel className="h-5 w-5 text-primary" /> : <Car className="h-5 w-5 text-primary" />}
                <div>
                  <h4 className="font-medium">{location.name}</h4>
                  <p className="text-sm text-muted-foreground">{location.distance} • {location.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{location.rating}</span>
                </div>
                <Badge className={getConditionColor(location.condition)} variant="secondary">
                  {location.condition}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}