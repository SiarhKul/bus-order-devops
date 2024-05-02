#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {S3BucketStack} from '../lib/s3-bucket-stack';
import {RdsStack} from "../lib/rds-stack";
import {CdkStarterStack} from "../lib/cdk-starter-stack";
import {PhotosStack} from "../lib/PhotosStack";
import {PhotosHandlerStack} from "../lib/PhotosHandlerStack";
import {BucketTarget} from "./Tagger";

const app = new cdk.App();

const photosStack: PhotosStack = new PhotosStack(
    app,
    "PhotoStack"
);

new PhotosHandlerStack(
    app,
    'PhotosHandlerStack',
    {
        targetBucketArn: photosStack.photosBucketArn
    }
)

const target: BucketTarget = new BucketTarget('level', 'test');
cdk.Aspects.of(app).add(target)
// new S3BucketStack(app, 'S3BucketStack', {});
// new CdkStarterStack(app, "CdkStartedStack", {})
// new RdsStack(app, 'RdsStack', {});
