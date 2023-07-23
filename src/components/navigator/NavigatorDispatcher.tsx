import { useTheme } from "@mui/material";
import NavigatorPortrait from "./NavigatorPortrait";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { RouteType } from "../../model/RouteType";
import Navigator from "./Navigator";

export const NavigatorDispatcher: React.FC<{routes: RouteType[], userDataRole: string}> = ({routes,
    userDataRole}) => {
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('sm'))
    return !isPortrait ? <Navigator routes={routes} userDataRole={userDataRole}></Navigator>
    : <NavigatorPortrait routes={routes} userDataRole={userDataRole}></NavigatorPortrait>
}