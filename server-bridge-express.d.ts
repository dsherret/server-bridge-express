import * as express from "express";
import {Routes} from "server-bridge";

export function initializeRoutes(router: express.Router, routes: typeof Routes[]): void;
