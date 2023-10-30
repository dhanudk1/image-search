import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../store/slices/image.slice";
import Loader from "../components/Loader";

const Images = () => {
  const dispatch = useDispatch();
  const { images, loader } = useSelector((state) => state.image);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getImages(""));
  }, []);

  return (
    <div className="container">
      <div className="row mt-3 mb-3">
        <div className="col-sm-12 col-md-6">
          <input
            type="text"
            className="form-control ps-5 "
            placeholder="Search Images.."
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>

        <div className="col-sm-12 col-md-6">
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              dispatch(getImages(search));
            }}
          >
            <i className="fa fa-eye "></i>
            Search
          </button>
          <button
            className="btn btn-outline-dark ms-2"
            onClick={() => {
              dispatch(getImages(""));
              setSearch("");
            }}
          >
            <i className="fa fa-superpowers"></i>
            Reset{" "}
          </button>
        </div>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <div className="row">
          {images.map((image) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-3 gy-3" key={image.id}>
                <div className="card" style={{ height: "100%" }}>
                  <img
                    src={image.largeImageURL}
                    className="card-img-top "
                    alt="#"
                    height="350"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between ">
                      <strong>
                        <i className="fa fa-heart text-danger "></i>
                        {image.likes}
                      </strong>
                      <strong>
                        <i className="fa fa-comment text-warning ">
                          {image.comments}
                        </i>
                      </strong>
                      <strong>
                        <i className="fa fa-eye text-info">{image.views}</i>
                      </strong>
                    </div>
                    <p className="mb-0 mt-3">
                      {image.tags.split(",").map((tag) => {
                        return (
                          <span className="badge bg-dark me-3" key={tag}>
                            {tag}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Images;
