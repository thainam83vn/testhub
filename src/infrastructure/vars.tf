variable "AMIS" {
    type = "map"
    default = {
        us-east-1 = "ami-13be557e"
    }
}

variable "PATH_TO_PUBLIC_KEY" {
    default = "keys/dev.pub"
}

variable "PATH_TO_PRIVATE_KEY" {
    default = "keys/dev"
}

variable "INSTANCE_USERNAME" {
    default = "ubuntu"
}