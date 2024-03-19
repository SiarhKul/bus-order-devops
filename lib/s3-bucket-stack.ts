import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3Notifications from 'aws-cdk-lib/aws-s3-notifications';
import {Construct} from 'constructs';

export class S3BucketStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const level2S3BucketInstance = new s3.Bucket(this, 'Level2S3Bucket', {
            versioned: true,
            bucketName: 'bus-order-bucket',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda'),
        });

        level2S3BucketInstance.addEventNotification(
            s3.EventType.OBJECT_CREATED,
            new s3Notifications.LambdaDestination(lambdaFunction)
        );
    }
}
