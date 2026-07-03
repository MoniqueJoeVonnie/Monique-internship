import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
  dots: false,          // removes bottom dots
  infinite: true,
  speed: 500,
  slidesToShow: 4,      // show 4 cards
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

  useEffect(() => {
    async function fetchCollections() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    setCollections(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

    fetchCollections();
  }, []);

  const skeletonCards = new Array(4).fill(0);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <Slider {...settings}>
          {loading
            ? skeletonCards.map((_, index) => (
                <div key={index}>
                  <div className="collection-card">
                    <div className="nft_coll skeleton-card">
                      <div className="skeleton skeleton-banner"></div>
                      <div className="skeleton skeleton-avatar"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
              ))
            : collections.slice(0, 6).map((collection) => (
                <div key={collection.id}>
                  <div className="collection-card">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.id}`}>
                          <h4>{collection.title}</h4>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={collection.title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;