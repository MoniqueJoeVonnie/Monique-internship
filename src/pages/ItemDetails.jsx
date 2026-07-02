import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchItem() {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      const selectedItem = response.data.find(
        (collection) => collection.id === Number(id)
      );

      setItem(selectedItem);
    }

    fetchItem();
  }, [id]);

  if (!item) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              
              {/* Left image skeleton */}
              <div className="col-md-6">
                <div className="detail-skeleton-image skeleton"></div>
              </div>

              {/* Right content skeleton */}
              <div className="col-md-6">
                <div className="detail-skeleton-title skeleton"></div>

                <div className="detail-skeleton-stats">
                  <div className="detail-skeleton-stat skeleton"></div>
                  <div className="detail-skeleton-stat skeleton"></div>
                </div>

                <div className="detail-skeleton-text skeleton"></div>
                <div className="detail-skeleton-text skeleton"></div>
                <div className="detail-skeleton-text short skeleton"></div>

                <div className="detail-skeleton-author">
                  <div className="detail-skeleton-avatar skeleton"></div>
                  <div className="detail-skeleton-name skeleton"></div>
                </div>

                <div className="detail-skeleton-author">
                  <div className="detail-skeleton-avatar skeleton"></div>
                  <div className="detail-skeleton-name skeleton"></div>
                </div>

                <div className="detail-skeleton-price skeleton"></div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{item.nftId}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.authorId}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.code}
                    </div>
                  </div>

                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam.
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author">Author #{item.authorId}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author">Creator #{item.id}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>0.{item.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
