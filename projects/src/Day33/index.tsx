import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addNote } from "../redux/reducers/notes";

const Container = styled.div`
  min-height: 100vh;
  height: auto;
  background-color: #7bdaf3;
  font-family: "Poppins", sans-serif;
`;

const DivButton = styled.div`
  text-align: right;
  padding: 16px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-weight: 700;
  padding: 10px 20px;
  background-color: #9ec862;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 34px;
  height: auto;
  padding: 16px;
`;

const DivNote = styled.div`
  width: 400px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 10%);

  .header {
    text-align: right;
    background-color: #9ec862;
    padding: 10px 8px;

    i {
      color: #fff;
      padding: 0px 4px;
      font-size: 20px;
    }

    i:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .content {
    .text-area {
      width: 100%;
      height: 457px;
      font-size: 20px;
      outline: none;
      border: none;
      padding: 10px;
    }
  }
`;

export default function Notes() {
  let arrLocal = JSON.parse(localStorage.getItem("note") || "[]");
  const [valueInput, setValueInput] = useState<string>("");
  const [arrNote, setArrNote] = useState<string[]>(arrLocal);
  const [edit, setEdit] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleAddNote = () => {
    console.log("arrLocal", arrLocal);
    let arr: string[] = [];
    arr.push("");
    setArrNote([...arrNote, ...arr]);
    console.log(arrNote);
    dispatch(addNote(''));
  };

  const handleSaveNote = (i: number) => {
    if (!edit && valueInput !== "") {
      localStorage.setItem("note", JSON.stringify([...arrLocal, valueInput]));
    } else if (edit) {
      arrLocal[i] = valueInput;
      localStorage.setItem("note", JSON.stringify([...arrLocal]));
    }
    setEdit(true);
  };

  const handleDelete = (i: number) => {
    let newArr = [...arrLocal];
    console.log(newArr.splice(i, 1))
    console.log(newArr)
    setArrNote([...newArr]);
    localStorage.setItem("note", JSON.stringify(newArr));
  }

  return (
    <>
      <Container>
        <DivButton>
          <Button onClick={handleAddNote}>Add Note</Button>
        </DivButton>
        <Content>
          {arrNote.map((note: any, index: number) => (
            <DivNote key={index}>
              <div className="header">
                <i>
                  <EditOutlined onClick={() => handleSaveNote(index)} />
                </i>
                <i>
                  <DeleteOutlined onClick={() => handleDelete(index)} />
                </i>
              </div>
              <div className="content">
                <textarea
                  className="text-area"
                  defaultValue={note}
                  onChange={(e) => setValueInput(e.target.value)}
                />
              </div>
            </DivNote>
          ))}
        </Content>
      </Container>
    </>
  );
}
