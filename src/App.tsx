import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import * as fs from "fs";

const StaticInfos = () => {
    return (
        <>
            <h1>固定</h1>
            <object
                data="staticfile.txt"
                width={"100%"}
                height={300}
                style={{ border: "1px solid #000" }}
            ></object>
        </>
    );
};

type NoteType = { title: string; memo: string };
const Notes = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const addedRef = useRef<HTMLDivElement>(null);
    const [disableAdd, setDisabledAdd] = useState(true);

    const [inputTitle, setInputTitle] = useState("");
    const [inputMemo, setInputMemo] = useState("");
    useEffect(() => {
        console.log({ title: inputTitle, memo: inputMemo });
        if (inputTitle !== "" && inputMemo !== "") {
            setDisabledAdd(false);
        } else {
            setDisabledAdd(true);
        }
    }, [inputTitle, inputMemo]);

    const clearInput = () => {
        setInputTitle("");
        setInputMemo("");
    };

    const handleAdd = () => {
        const newState = [...notes];
        newState.push({ title: inputTitle, memo: inputMemo });

        setNotes(newState);

        clearInput();

        console.log({ title: inputTitle, memo: inputMemo });

        // // === how to ref ===
        // console.log(ref.current); // 1
        // console.log(ref.current?.childNodes); // NodeList(5) [text,input,br,text,input]
        // console.log(ref.current?.childNodes[3]); // memo:
        // console.log(ref.current?.childNodes[2]); // <br>

        // console.log(ref.current?.children); // HTMLCollection(3) []input,br,input]   memo: input  title: input
        // const titleElement: HTMLInputElement = ref.current!.children!.namedItem(
        //     "title"
        // ) as HTMLInputElement;
        // console.log(titleElement.value); // value of input name="title"

        // if (
        //     ref.current &&
        //     ref.current.children &&
        //     ref.current.children.namedItem("title") &&
        //     ref.current.children.namedItem("memo")
        // ) {
        //     const newTitleElement = ref.current!.children!.namedItem(
        //         "title"
        //     ) as HTMLInputElement;
        //     const newMemoElement = ref.current!.children!.namedItem(
        //         "memo"
        //     ) as HTMLTextAreaElement;

        //     // if (newTitleElement.value !== "" && newMemoElement.value !== "") {
        //     //     setDisabledAdd(false);
        //     // } else {
        //     //     setDisabledAdd(true);
        //     // }
        //     const newState = [...notes];
        //     newState.push({
        //         title: newTitleElement.value,
        //         memo: newMemoElement.value,
        //     });

        //     setNotes(newState);

        //     // clear
        //     newTitleElement.value = "";
        //     newMemoElement.value = "";
        //     setDisabledAdd(true);
        // }
    };

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        addedRef: React.RefObject<HTMLDivElement>,
        index: number
    ) => {
        // console.log(index);

        // delete last note
        // console.log(e.target);
        // console.log(addedRef.current);
        // addedRef.current?.remove();
        // const newState = [...notes].filter(
        //     (note, i) => i !== notes.length - 1
        // );
        const newState = [...notes].filter((note, i) => i !== index);

        setNotes(newState);
    };
    const handleToggleEdit = (
        e: React.MouseEvent<HTMLButtonElement>,
        addedRef: React.RefObject<HTMLDivElement>,
        index: number
    ) => {
        const newTitleElement = addedRef.current!.children!.namedItem(
            "title"
        ) as HTMLInputElement;
        const newMemoElement = addedRef.current!.children!.namedItem(
            "memo"
        ) as HTMLTextAreaElement;
        // toggle disabled
        newTitleElement.toggleAttribute("disabled");
        newMemoElement.toggleAttribute("disabled");
        // console.log(index);
        // delete last note
        // console.log(e.target);
        // console.log(addedRef.current);
        // addedRef.current?.remove();
        // const newState = [...notes].filter(
        //     (note, i) => i !== notes.length - 1
        // );
        // const newState = [...notes].filter((note, i) => i !== index);
        // setNotes(newState);
    };
    useEffect(() => {}, []);
    useEffect(() => {
        // console.log("=====");
        // notes.forEach((note) => console.log(note));
    }, [notes]);

    return (
        <>
            <h1>Note</h1>
            <div ref={ref}>
                title:
                <br />
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setInputTitle(e.target.value)}
                    value={inputTitle}
                />
                <br />
                memo:
                <br />
                <textarea
                    name="memo"
                    id=""
                    cols={80}
                    rows={8}
                    onChange={(e) => setInputMemo(e.target.value)}
                    value={inputMemo}
                ></textarea>
            </div>
            <button onClick={handleAdd} disabled={disableAdd}>
                Add
            </button>
            <hr />
            {notes.map((note, index) => {
                return (
                    <div key={index} ref={addedRef}>
                        title:
                        <br />
                        <input
                            type="text"
                            name="title"
                            value={note.title}
                            disabled
                        />
                        <br />
                        memo:
                        <br />
                        <textarea
                            name="memo"
                            id=""
                            cols={30}
                            rows={10}
                            value={note.memo}
                            disabled
                        ></textarea>
                        <br />
                        <button
                            onClick={(e) =>
                                handleToggleEdit(e, addedRef, index)
                            }
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => handleDelete(e, addedRef, index)}
                        >
                            Delete
                        </button>
                        <hr />
                    </div>
                );
            })}
        </>
    );
};

function App() {
    return (
        <div className="App">
            <StaticInfos />
            <Notes />
        </div>
    );
}

export default App;
