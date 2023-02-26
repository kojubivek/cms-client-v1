import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteCat, fetchCats } from "../../pages/category/categoryAction";
import { setShowModal } from "../../system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { EditCatFrm } from "./EditCatFrm";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { cats } = useSelector((state) => state.category);

  const [selecteCat, setSelectedCat] = useState({});

  useEffect(() => {
    dispatch(fetchCats());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCat(_id));
    }
  };

  const handleOnEdit = (item) => {
    setSelectedCat(item);
    dispatch(setShowModal(true));
  };

  return (
    <div className="mt-5">
      <div>{cats.length} categories found!</div>
      <CustomModal show={false} title="Update category">
        <EditCatFrm selecteCat={selecteCat} />
      </CustomModal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Status</th>
            <th> Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cats?.length > 0 &&
            cats.map((itme, i) => (
              <tr key={itme?._id}>
                <td>{i + 1}</td>
                <td
                  className={`text-${
                    itme.status === "active" ? "success" : "danger"
                  }`}
                >
                  {itme.status}
                </td>
                <td>{itme.name}</td>
                <td>{itme.slug}</td>
                <td>
                  <Button onClick={() => handleOnEdit(itme)} variant="warning">
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleOnDelete(itme._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
