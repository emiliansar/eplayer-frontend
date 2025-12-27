import { AuthorContextProvider } from "../../../context/author-context";
import AuthorLayout from "./AuthorLayout";

export default function AuthorLayoutContext() {
    return (
        <AuthorContextProvider>
            <AuthorLayout />
        </AuthorContextProvider>
    )
}