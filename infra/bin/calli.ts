#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { CalliStack } from "../lib/calli-stack";

const app = new App();
new CalliStack(app, "CalliStack");
