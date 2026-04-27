#!/bin/bash

# Configuration
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="387923918167"
ECR_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
CLUSTER_NAME="trendhub"  # Updated to match your screenshot
SERVICE_NAME="trendhub-task-service-ogus6p4o" # Updated to match your screenshot

echo "Step 1: Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

echo "Step 2: Building and Pushing Backend..."
docker build -t trendhub-backend ./backend
docker tag trendhub-backend:latest $ECR_REGISTRY/trendhub-backend:latest
docker push $ECR_REGISTRY/trendhub-backend:latest

echo "Step 3: Building and Pushing Frontend..."
docker build -t trendhub-frontend ./frontend
docker tag trendhub-frontend:latest $ECR_REGISTRY/trendhub-frontend:latest
docker push $ECR_REGISTRY/trendhub-frontend:latest

echo "Step 4: Updating ECS Service..."
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment

echo "Deployment Complete! 🚀"
echo "Check your website at your ECS Task Public IP."
