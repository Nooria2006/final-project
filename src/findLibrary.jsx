import { useState } from "react";
import {
  Search,
  MapPin,
  Navigation,
  LibraryBig,
  Map,
  ExternalLink,
  RefreshCw,
  Clock,
  LocateFixed,
  BookOpen,
} from "lucide-react";

import PageLayout from "./PageLayout";
import "./findLibrary.css";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadius = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return (
    earthRadius *
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

function getLibraryAddress(tags) {
  const street = [
    tags["addr:housenumber"],
    tags["addr:street"],
  ]
    .filter(Boolean)
    .join(" ");

  const parts = [
    street,
    tags["addr:suburb"],
    tags["addr:city"] || tags["addr:town"] || tags["addr:village"],
    tags["addr:country"],
  ].filter(Boolean);

  return parts.length
    ? parts.join(", ")
    : tags["addr:full"] || "Address not available";
}

function FindLibrary({ setCurrentPage }) {
  const [location, setLocation] = useState("");
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchCenter, setSearchCenter] = useState(null);

  async function fetchLibraries(lat, lon) {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="library"](around:10000,${lat},${lon});
        way["amenity"="library"](around:10000,${lat},${lon});
        relation["amenity"="library"](around:10000,${lat},${lon});
      );
      out center tags;
    `;

    const response = await fetch(
      `${OVERPASS_URL}?data=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(
        "The library search service is temporarily unavailable."
      );
    }

    const data = await response.json();

    const results = (data.elements || [])
      .map((item) => {
        const tags = item.tags || {};

        const latitude = item.lat ?? item.center?.lat;
        const longitude = item.lon ?? item.center?.lon;

        if (latitude == null || longitude == null) {
          return null;
        }

        return {
          id: `${item.type}-${item.id}`,
          name: tags.name || tags["name:en"] || "Unnamed Library",
          address: getLibraryAddress(tags),
          latitude,
          longitude,
          distance: calculateDistance(
            lat,
            lon,
            latitude,
            longitude
          ),
          website: tags.website || tags["contact:website"] || "",
          phone: tags.phone || tags["contact:phone"] || "",
          openingHours: tags.opening_hours || "",
          wheelchair: tags.wheelchair || "",
          type: tags.library || "Public Library",
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance);

    setLibraries(results);
  }

  async function searchLibraries(event) {
    event?.preventDefault();

    const searchTerm = location.trim();

    if (!searchTerm) {
      setError("Please enter a city or location first.");
      setLibraries([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setSearchedLocation(searchTerm);

    try {
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!geocodeResponse.ok) {
        throw new Error("Unable to find this location.");
      }

      const places = await geocodeResponse.json();

      if (!places.length) {
        throw new Error(
          "Location not found. Please try a different city or address."
        );
      }

      const latitude = Number(places[0].lat);
      const longitude = Number(places[0].lon);

      setSearchCenter({
        latitude,
        longitude,
      });

      await fetchLibraries(latitude, longitude);
    } catch (err) {
      setLibraries([]);
      setError(
        err.message ||
          "Unable to search right now. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  }

  function findNearbyLibraries() {
    if (!navigator.geolocation) {
      setError("Your browser does not support location detection.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setSearchedLocation("Your current location");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setSearchCenter({
          latitude,
          longitude,
        });

        try {
          await fetchLibraries(latitude, longitude);
        } catch {
          setLibraries([]);
          setError(
            "Unable to load nearby libraries. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError(
          "Location permission was denied or your location could not be detected. You can search by city instead."
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  function openMap(library) {
    const url = `https://www.openstreetmap.org/?mlat=${library.latitude}&mlon=${library.longitude}#map=17/${library.latitude}/${library.longitude}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <PageLayout
      title="Find Library"
      description="Discover libraries and reading spaces around the world."
      currentPage="findLibrary"
      setCurrentPage={setCurrentPage}
    >
      <div className="find-library-page">
        <section className="find-library-hero">
          <div className="find-library-hero-content">
            <span className="find-library-eyebrow">
              <Navigation size={15} />
              EXPLORE YOUR READING WORLD
            </span>

            <h2>
              Discover a library
              <br />
              <span>near you.</span>
            </h2>

            <p>
              Find nearby libraries, explore their locations,
              and discover new places to read and learn.
            </p>

            <form
              className="find-library-search"
              onSubmit={searchLibraries}
            >
              <MapPin size={21} />

              <input
                type="search"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter a city or location..."
                aria-label="Enter a city or location"
              />

              <button type="submit" disabled={loading}>
                <Search size={17} />
                Search
              </button>
            </form>

            <button
              type="button"
              className="find-library-nearby"
              onClick={findNearbyLibraries}
              disabled={loading}
            >
              <LocateFixed size={17} />
              Find Libraries Near Me
            </button>

            <p className="find-library-location-note">
              Your location is only accessed if you allow it in your browser.
            </p>
          </div>

          <div
            className="find-library-hero-art"
            aria-hidden="true"
          >
            <div className="find-library-art-circle">
              <LibraryBig size={82} strokeWidth={1.2} />
            </div>
            <span className="find-library-art-pin pin-one">
              <MapPin size={27} />
            </span>
            <span className="find-library-art-pin pin-two">
              <MapPin size={20} />
            </span>
            <span className="find-library-art-star">✦</span>
          </div>
        </section>

        <section className="find-library-results">
          <div className="find-library-results-header">
            <div>
              <span className="find-library-section-label">
                YOUR DISCOVERY
              </span>

              <h2>
                {searched ? "Library Search Results" : "Explore Libraries"}
              </h2>

              <p>
                {loading
                  ? "Searching for nearby libraries..."
                  : searched
                    ? `${libraries.length} ${
                        libraries.length === 1 ? "library" : "libraries"
                      } found near ${searchedLocation}`
                    : "Search for a city to discover nearby libraries."}
              </p>
            </div>

            {searched && (
              <button
                type="button"
                className="find-library-reset"
                onClick={() => {
                  setLibraries([]);
                  setError("");
                  setSearched(false);
                  setLocation("");
                  setSearchedLocation("");
                  setSearchCenter(null);
                }}
                disabled={loading}
              >
                <RefreshCw size={16} />
                New Search
              </button>
            )}
          </div>

          {searchCenter && !loading && !error && (
            <div className="find-library-map-banner">
              <div className="find-library-map-icon">
                <Map size={22} />
              </div>

              <div>
                <h3>Explore the area</h3>
                <p>
                  Libraries are sorted by their approximate distance
                  from your searched location.
                </p>
              </div>

              <a
                href={`https://www.openstreetmap.org/?mlat=${searchCenter.latitude}&mlon=${searchCenter.longitude}#map=12/${searchCenter.latitude}/${searchCenter.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Map <ExternalLink size={15} />
              </a>
            </div>
          )}

          {loading && (
            <div className="find-library-state">
              <span className="find-library-spinner" />
              <h3>Finding libraries...</h3>
              <p>Please wait while we search the map data.</p>
            </div>
          )}

          {!loading && error && (
            <div className="find-library-state find-library-error">
              <MapPin size={35} />
              <h3>We couldn't complete the search</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && !searched && (
            <div className="find-library-empty">
              <div className="find-library-empty-icon">
                <LibraryBig size={36} />
              </div>

              <h3>Your next reading place awaits</h3>

              <p>
                Enter a city such as Kabul or Islamabad, or use
                your location to search for nearby libraries.
              </p>

              <div className="find-library-city-buttons">
                {["Kabul, Afghanistan", "Islamabad, Pakistan"].map(
                  (city) => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setLocation(city)}
                    >
                      <MapPin size={14} />
                      {city}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {!loading && !error && searched && libraries.length === 0 && (
            <div className="find-library-state">
              <BookOpen size={35} />
              <h3>No libraries found in this search</h3>
              <p>
                There may be no libraries mapped within 10 km of
                this location. Try a nearby city or another location.
              </p>
            </div>
          )}

          {!loading && !error && libraries.length > 0 && (
            <div className="find-library-grid">
              {libraries.map((library) => (
                <article
                  className="find-library-card"
                  key={library.id}
                >
                  <div className="find-library-card-top">
                    <div className="find-library-card-icon">
                      <LibraryBig size={27} />
                    </div>

                    <span className="find-library-distance">
                      <Navigation size={13} />
                      {library.distance < 1
                        ? `${Math.round(library.distance * 1000)} m away`
                        : `${library.distance.toFixed(1)} km away`}
                    </span>
                  </div>

                  <div className="find-library-card-content">
                    <span className="find-library-type">
                      {library.type}
                    </span>

                    <h3>{library.name}</h3>

                    <div className="find-library-detail">
                      <MapPin size={16} />
                      <p>{library.address}</p>
                    </div>

                    {library.openingHours && (
                      <div className="find-library-detail">
                        <Clock size={16} />
                        <p>{library.openingHours}</p>
                      </div>
                    )}

                    {library.phone && (
                      <p className="find-library-phone">
                        Phone: {library.phone}
                      </p>
                    )}

                    <div className="find-library-card-actions">
                      <button
                        type="button"
                        onClick={() => openMap(library)}
                      >
                        <Map size={16} />
                        View on Map
                      </button>

                      {library.website && (
                        <a
                          href={
                            library.website.startsWith("http")
                              ? library.website
                              : `https://${library.website}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${library.name} website`}
                          title="Visit website"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="find-library-api-note">
          <Map size={18} />
          <p>
            Location data provided by{" "}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenStreetMap
            </a>
            . Information may be incomplete or out of date.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default FindLibrary;