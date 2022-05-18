import { useParams } from "react-router-dom";

export const Registered = () => {
  const { teamID } = useParams();

  return <div className="container">El team ID de su equipo es: {teamID} </div>;
};
