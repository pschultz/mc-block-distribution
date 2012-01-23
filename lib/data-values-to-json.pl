#!/usr/bin/env perl

use strict;
use Data::Dumper;
use JSON;

my $values = {};
while(<>) {
    my $line = $_;
    if(my @m = $line =~ m/\{\{dec-hex\|0*(\d+)\}\}.*?\|\|(.*)$/) {
        my $v = $m[1];
        $v =~ s/<sup.*$//;
        $v =~ s/\[\[.*?\|(.*?)\]\]/$1/;
        $v =~ s/\[\[(.*?)\]\]/$1/g;
        $values->{$m[0]} = $v;
    }
    elsif($line =~ m/dec-hex/) {
        print $line;
    }
}

#foreach my $k (sort { $a <=> $b } keys %$values) {
#    my $v = $values->{$k};
#    printf STDERR "%3d: %s\n", $k, $v;
#}
print "window.blocks = ";
print encode_json $values;
print ";";
