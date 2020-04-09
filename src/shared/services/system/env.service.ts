import { Injectable } from "@angular/core";

@Injectable({
providedIn: "root"
})
export class EnvService {
// Host
public host = "http://localhost:4200";

// API url
public apiUrl = "http://localhost:3151";

// Version
public version = "1.0.0";

// Whether or not to enable debug mode
public enableDebug = true;

constructor() {}
}