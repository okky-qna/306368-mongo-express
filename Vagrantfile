# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "puphpet/ubuntu1404-x64"

  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 27017, host: 27017


  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "./", "/home/vagrant/mongo-express"

  # Define ssh configrations
  config.ssh.forward_agent = true
  config.ssh.forward_x11 = true

  config.vm.provision :shell, inline: <<-SHELL
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    mkdir -p /etc/apt/sources.list.d
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" |  tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    apt-get update -y
    apt-get install -y -q git build-essential curl
    curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
    apt-get install -y -q nodejs mongodb-org
  SHELL

  config.vm.provision :shell, privileged: false, inline: <<-SHELL
    npm config set bin-links false
  SHELL
end
