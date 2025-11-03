import CodeMirror, { type Extension } from '@uiw/react-codemirror';
import { MdOutlineClose } from 'react-icons/md';

type CodeModalProps = {
    value: string;
    extensions: Extension[];
    theme: Extension | undefined;
    onCodeChange: (e: React.SetStateAction<string>) => void
    onCloseClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

//Expanded code view modal
export default function CodeModal(props: CodeModalProps){
    return (
        <>
            <div className="fixed inset-0 bg-black/80 z-998"></div>

            <div className="overflow-hidden grid grid-rows-[auto_1fr] fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-999 rounded-t-lg bg-zinc-100">
                <div className="grid grid-cols-[auto_1fr] p-5 text-amber-600 bg-zinc-900 rounded-t-lg">
                    <div className="brand-font text-2xl">
                        Code View
                    </div>
                    <div onClick={props.onCloseClick} className="text-2xl flex items-center justify-end">
                        <MdOutlineClose className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    <CodeMirror value={props.value} onChange={props.onCodeChange} height="100%" extensions={props.extensions} theme={props.theme} className="overflow-x-auto border-t-8 border-indigo-800 h-[80dvh] w-[90dvw]" />
                </div>
            </div>
        </>
    )
}