import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import rectangle from "../assets/Rectangle.png";

type WeatherCardProps = {
    title: string;
    value: string | number;
    icon: string;
};

export function WeatherCard({ title, value, icon }: WeatherCardProps) {
    return (
        <Card
            style={{ backgroundImage: `url(${rectangle})` }}
            className="w-80 h-40 relative flex flex-col items-center border-0 justify-center rounded-2xl shadow-md bg-transparent text-white  overflow-hidden"
        >
            <img src={icon} alt={title} className="w-20 absolute right-2 top-2 h-20" />

            <CardHeader className="p-0 text-center">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-center">
                <p className="text-lg font-bold">{value}</p>
            </CardContent>
        </Card>
    );
}
