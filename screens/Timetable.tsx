import { Header, Container, ListTimetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const Timetable = () => {
    const { hasErrors } = useStore((state) => state);

    return (
        <Container>
            <Header />
            {/* <ListTimetable /> */}
            {hasErrors ? <Error /> : <Greeting />}
        </Container>
    );
};
