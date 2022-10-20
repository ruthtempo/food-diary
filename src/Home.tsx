import { Link } from "react-router-dom";
import foodMood from "./FOODMOOD.png";

export function Home() {
  return (
    <div className=" my-2 d-flex flex-column justify-content-between align-items-stretch">
      <img src={foodMood} alt="foodmood logo" className="w-100"></img>
      <Link className="btn btn-light mb-3 mt-3" to="/register-meal">
        Register Meal
      </Link>
      <Link className="btn btn-light" to="/register-symptoms">
        Register Symptoms
      </Link>
    </div>
  );
}
