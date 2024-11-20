import pckjson from "../package.json";
export function Footer() {
  return <div className="text-center my-10">Version {pckjson.version}</div>;
}
