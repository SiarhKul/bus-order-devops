import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket} from "aws-cdk-lib/aws-s3";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const level2S3Bucket = new Bucket(this, 'Level2S3Bucket',{
        versioned: true,
      bucketName:'bus-order-bucket',
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'BusOrderDevopsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
