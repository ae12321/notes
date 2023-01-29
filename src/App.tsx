import React, { RefObject, useEffect, useRef, useState } from "react";
import "./App.css";

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

const SAVE_KEY = "my_todo";

type NoteType = { title: string; memo: string };
const Notes = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    const addedRef = useRef<RefObject<HTMLDivElement>[]>([]);
    notes.forEach((_, i) => {
        addedRef.current[i] = React.createRef<HTMLDivElement>();
    });
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

    useEffect(() => {
        readData();
    }, []);

    const readData = () => {
        const data = localStorage.getItem(SAVE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            setNotes([...parsed]);
        }
    };
    const saveData = () => {
        localStorage.setItem(SAVE_KEY, JSON.stringify(notes));
    };

    const displayLog = () => {
        console.log("-1----");
        notes.map((note) => console.log(note));
        console.log("-2----");
        readData();
        console.log("-3----");
        saveData();
    };

    const clearInput = () => {
        setInputTitle("");
        setInputMemo("");
    };
    const handleAdd = () => {
        const newState = [...notes];
        newState.push({ title: inputTitle, memo: inputMemo });

        setNotes(newState);

        clearInput();
    };

    const handleChangeNote = (e: React.ChangeEvent<HTMLElement>, i: number) => {
        const newState = [...notes];
        // console.log(e.target.nodeName); // TEXTAREA, INPUT

        let name;
        let value;
        if (e.target.nodeName === "INPUT") {
            newState.find((_, index) => index === i)!.title = (
                e.target as HTMLTextAreaElement
            ).value;
        } else {
            // e.target.nodeName === "TEXTAREA"
            newState.find((_, index) => index === i)!.memo = (
                e.target as HTMLInputElement
            ).value;
        }

        setNotes(newState);
        saveData();
    };

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        addedRef: React.RefObject<HTMLDivElement>,
        index: number
    ) => {
        const newState = [...notes].filter((note, i) => i !== index);
        setNotes(newState);
        saveData();
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
            <button onClick={displayLog}>log</button>
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
                    <div key={index} ref={addedRef.current[index]}>
                        title:
                        <br />
                        <input
                            type="text"
                            name="title"
                            value={note.title}
                            disabled
                            onChange={(e) => handleChangeNote(e, index)}
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
                            onChange={(e) => handleChangeNote(e, index)}
                        ></textarea>
                        <br />
                        <button
                            onClick={(e) =>
                                handleToggleEdit(
                                    e,
                                    addedRef.current[index],
                                    index
                                )
                            }
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) =>
                                handleDelete(e, addedRef.current[index], index)
                            }
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
