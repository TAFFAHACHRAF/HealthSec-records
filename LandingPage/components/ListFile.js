//This component will just render the files of a particular category by fetching it from the Subgraph and displaying it.

import NoFiles from "./NoFiles"
import ListItem from "./ListItem"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ListFile({ fileMetadataHash, customText, haveFiles }) {
    //Just fetch all the data from the subgraph and display it in form of cards

    // console.log("I am a 0 th index", fileMetadataHash[0])
    if (!haveFiles) {
        return (
            <div>
                {" "}
                <NoFiles customText={customText} />{" "}
            </div>
        )
    }
    //This means we have files and we have to display it.

    return (
        <div>
            {fileMetadataHash.map((item) => {
                return (
                    <div>
                        {" "}
                        <ListItem metadataURI={item} key={item} />
                    </div>
                )
            })}
        </div>
    )

}

